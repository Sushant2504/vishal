import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IShippingForm extends Document {
  name: string
  address: string
  contactNumber: string
  emailAddress: string
  preferredPaymentMethod: string
  paymentDetails: string
  expectedShippingDay: string
  boxesMintCondition: string
  damageNotes?: string
  createdAt: Date
  updatedAt: Date
}

const ShippingFormSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    preferredPaymentMethod: {
      type: String,
      required: true,
      enum: ['Venmo', 'Check', 'Zelle', 'CashApp', 'PayPal'],
    },
    paymentDetails: {
      type: String,
      required: true,
    },
    expectedShippingDay: {
      type: String,
      required: true,
    },
    boxesMintCondition: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
    damageNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const ShippingForm: Model<IShippingForm> = mongoose.models.ShippingForm || mongoose.model<IShippingForm>('ShippingForm', ShippingFormSchema)

export default ShippingForm

