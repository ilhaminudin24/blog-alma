import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Blog Content')
        .items([
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('music').title('Music Library'),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) => item.getId() && !['post', 'music'].includes(item.getId()!),
            ),
        ])
