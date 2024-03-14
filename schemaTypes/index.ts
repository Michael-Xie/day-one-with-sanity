import {artistType} from './artistType'
import {couponType} from './coupon/couponType'
import {eventType} from './eventType'
import {storeType} from './storeType'
import {venueType} from './venueType'

export const schemaTypes = [
  // objects
  couponType,
  // documents
  eventType,
  artistType,
  venueType,
  storeType,
]
