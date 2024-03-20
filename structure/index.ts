import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon, HomeIcon} from '@sanity/icons'
import VenueView from '../schemaTypes/components/VenueView'
import {Iframe} from 'sanity-plugin-iframe-pane'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList()
            .apiVersion('v2023-03-08')
            .title('Upcoming Events')
            .filter('date > now()'),
        ),
      S.listItem()
        .title('Past Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList().apiVersion('v2023-03-08').title('Past Events').filter('date < now()'),
        ),
      S.divider(),
      S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
      S.listItem()
        .title('Venues')
        .icon(PinIcon)
        .id('venues-list')
        .child(
          S.documentList()
            .title('Venues')
            .schemaType('venue')
            .filter('_type == $type')
            .params({type: 'venue'})
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('venue')
                .id(`venue-${documentId}`)
                .views([
                  S.view.form(),
                  S.view.component(VenueView).title('Component'),
                  S.view.component(Iframe).title('Iframe').options({
                    url: 'https://www.google.com',
                    // attributes: {
                    //   allow: 'fullscreen', // string, optional
                    //   referrerPolicy: 'strict-origin-when-cross-origin', // string, optional
                    //   sandbox: 'allow-same-origin', // string, optional
                    // },
                  }),
                ]),
            ),
        ),
      // S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.documentTypeListItem('store').title('Stores').icon(HomeIcon),
    ])
