import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
  sanityTutorialsWidget,
} from '@sanity/dashboard'

export default defineConfig({
  name: 'default',
  title: 'Day one with Sanity',

  projectId: 'tt7a5wj5',
  dataset: 'production',

  plugins: [
    structureTool({structure, defaultDocumentNode}),
    visionTool(),
    media(),
    dashboardTool({widgets: [sanityTutorialsWidget(), projectInfoWidget(), projectUsersWidget()]}),
  ],

  schema: {
    types: schemaTypes,
  },
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
  },
})
