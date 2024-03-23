export type CompanyDetailsValues = {
    name: string;
    email: string;
    phone_no: string;
    address_1: string;
    address_2: string;
    city: string;
    stateId: number | null;
    state: {
        id: number;
        name: string;
    } | null ;
    posCode: string;
}