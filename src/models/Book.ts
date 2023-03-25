// book model
import { array } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    author: string;
    genre: string[];
    sample: string;
    awards: string[];
}

export interface IBokkModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        title: { type: String, required: true },
        genre: { type: Array, required: true },
        sample: { type: String, required: true },
        awards: { type: Array, required: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBokkModel>('Book', BookSchema);
