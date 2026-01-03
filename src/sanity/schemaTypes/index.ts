import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { musicType } from './musicType'
import { quoteType } from './quoteType'
import { moodBoardType } from './moodBoardType'
import { qnaType } from './qnaType'
import { categoryType } from './categoryType'
import { localizedString } from './localizedString'
import { localizedText } from './localizedText'
import { localizedBlock } from './localizedBlock'
import { aboutType } from './aboutType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        postType,
        musicType,
        quoteType,
        moodBoardType,
        qnaType,
        categoryType,
        localizedString,
        localizedText,
        localizedBlock,
        aboutType,
        siteSettingsType,
    ],
}
