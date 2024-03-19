import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon, HomeIcon} from '@sanity/icons'
import VenueView from '../schemaTypes/components/VenueView'

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
      // S.documentTypeListItem('venues')
      //   .title('Venues')
      //   .icon(UsersIcon)
      //   .id('artists-list')
      //   .child(
      //     // Use a document list for artists
      //     S.documentList()
      //       .title('Artists')
      //       .schemaType('artist')
      //       .filter('_type == $type') // This filter ensures only 'artist' documents are listed
      //       .params({type: 'artist'})
      //       .child((documentId) =>
      //         // Configure the default view and the custom ArtistView as additional views
      //         S.document()
      //           .documentId(documentId)
      //           .schemaType('artist')
      //           .id(`artist-${documentId}`)
      //           .views([
      //             S.view.form(), // This is the default editing form
      //             S.view.component(ArtistView).title('Component'),
      //           ]),
      //       ),
      //   ),
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
                  S.view.component(VenueView).title('Component'), // Assuming you have a VenueView component
                ]),
            ),
        ),
      // S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.documentTypeListItem('store').title('Stores').icon(HomeIcon),
    ])
