import {defineType} from 'sanity'
import {CouponInput} from './CouponInput'

const isDraft = (documentId: string) => {
  return documentId.split('.')[0] === 'drafts'
}

const getNonDraftDocumentId = (documentId: string): string => {
  const components = documentId.split('.')
  if (isDraft(documentId)) {
    return components.splice(1).join('')
  }
  return ''
}

export const couponType = defineType({
  name: 'coupon',
  title: 'Coupon',
  description: 'A unique, all uppercase, four-character alphanumeric code',
  type: 'string',
  validation: (rule) => [
    rule
      .min(4)
      .max(4)
      .regex(/^[A-Z0-9]+$/),
    rule.custom((value, context: any) => {
      const client = context.getClient({apiVersion: '2023-03-08'})
      // No need to validate if the field is empty
      if (!value) {
        return true
      }

      const currentDocumentId = context?.document?._id

      const query = `*[_type == "store" && coupon == $coupon && _id != $currentDocumentId ${isDraft(currentDocumentId) ? `&& _id != $nonDraftCurrentDocumentId` : ''}]`
      const params = {
        coupon: value,
        currentDocumentId,
        nonDraftCurrentDocumentId: getNonDraftDocumentId(currentDocumentId),
      }

      return client.fetch(query, params).then((stores: any[]) => {
        return stores.length === 0 ? true : 'Coupon must be unique'
      })
    }),
  ],
  components: {input: CouponInput},
})
