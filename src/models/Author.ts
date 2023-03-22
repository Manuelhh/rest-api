// from mongoose for ts func
import mongoose, { Document, Schema } from 'mongoose';

// interface to dictate schema
export interface IAuthor {
    name: string;
}

// interface to dictate schema
export interface IAuthorModel extends IAuthor, Document {}

// athor schema
const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

// creating/exporting author model based on author schema
export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
