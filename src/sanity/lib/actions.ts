
import { TrashIcon } from '@sanity/icons'
import { useCallback, useState } from 'react'
import {
    DocumentActionProps,
    useClient,
    useDocumentOperation
} from 'sanity'

export function DeleteWithComments({ id, type, onComplete }: DocumentActionProps) {
    const client = useClient({ apiVersion: '2024-01-01' })
    const { delete: deleteOp } = useDocumentOperation(id, type)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isConfirmOpen, setConfirmOpen] = useState(false)

    const handleConfirm = useCallback(async () => {
        setIsDeleting(true)
        setConfirmOpen(false)

        try {
            // 1. Find all comments referencing this post
            const comments = await client.fetch(
                `*[_type == "comment" && post._ref == $postId]._id`,
                { postId: id }
            )

            // 2. Delete all referencing comments
            const transaction = client.transaction()
            comments.forEach((commentId: string) => {
                transaction.delete(commentId)
            })

            // 3. Delete the post itself (using the transaction for atomicity if possible, 
            // but here we mix client.transaction for comments and deleteOp for the doc)
            // Actually, standard deleteOp is better for the main doc to handle drafts etc provided by Studio.
            // But for a "clean sweep", we can just transaction delete the document too if we want to bypass checks,
            // HOWEVER, let's stick to doing the comments first, then the doc.

            await transaction.commit()

            // 4. Finally delete the document using the studio operation
            deleteOp.execute()

            onComplete()
        } catch (err) {
            console.error('Delete failed:', err)
            alert('Failed to delete references: ' + (err as Error).message)
        } finally {
            setIsDeleting(false)
        }
    }, [id, client, deleteOp, onComplete])

    if (type !== 'post') {
        return null
    }

    return {
        label: isDeleting ? 'Deleting...' : 'Delete with Comments',
        icon: TrashIcon,
        tone: 'critical',
        disabled: isDeleting,
        onHandle: () => {
            setConfirmOpen(true)
        },
        dialog: isConfirmOpen && {
            type: 'confirm',
            onCancel: onComplete,
            onConfirm: handleConfirm,
            message: 'This will delete the post AND all associated comments. Are you sure?',
        },
    }
}
