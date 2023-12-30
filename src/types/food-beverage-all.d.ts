export type foodBeverageAllValues = {
    id:number;
    name: string;
    price: string;
    Category: {
        id:number;
        name: string;
    };
    createdAt: DateTime;
    updatedAt: DateTime;
}