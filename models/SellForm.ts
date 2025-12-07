import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISellForm extends Document {
  name: string
  email: string
  phone: string
  productType: string
  brand?: string
  quantity: string
  expirationDate?: string
  condition: string
  message?: string
  createdAt: Date
  updatedAt: Date
}

const SellFormSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
    },
    condition: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const SellForm: Model<ISellForm> = mongoose.models.SellForm || mongoose.model<ISellForm>('SellForm', SellFormSchema)

export default SellForm

