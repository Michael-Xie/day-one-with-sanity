import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon, HomeIcon} from '@sanity/icons'

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
      S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.documentTypeListItem('store').title('Stores').icon(HomeIcon),
    ])
