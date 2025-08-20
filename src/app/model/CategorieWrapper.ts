import { Categorie } from "./categrie";

export interface CategorieWrapper{
    _embedded:  {categories: Categorie[]};
}
