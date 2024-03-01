import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    // preset user
    await prisma.user.create({
        data: {
            username: "LCCL Enterprise",
            name: "LCCL Enterprise",
            password: "$2a$12$8quS5sN1CzBpMc0KvmwqgeRLydKy8zsoHzVNzqBUnCu1AgcWHSHC2",
            email: "lccl.enterprise@gmail.com"
        },
    });
    // preset state
    await prisma.state.createMany({
        data: [
            {
                id: 1,
                name: "Selangor",
            },
            {
                id: 2,
                name: "Kuala Lumpur",
            },
            {
                id: 3,
                name: "Johor",
            },
        ],
    });
    // preset fnb company
    await prisma.company.create({
        data: {
            id: 1,
            name: "Alpha Cue Sports",
            email: "lccl.enterprise@gmail.com",
            phone_no: "-",
            address_1: "",
            address_2: "",
            city: "",
            stateId: 1,
            posCode: ""
        },
    });
    // preset fnb category
    await prisma.status.createMany({
        data: [
            {
                id: 1,
                name: "Ready",
            },
            {
                id: 2,
                name: "In Use",
            },
             {
                id: 3,
                name: "To Pay",
            }
        ]
        
    });
    // preset fnb category
    await prisma.fnBCategory.createMany({
        data: [
            {
                id: 1,
                name: "Food",
            },
            {
                id: 2,
                name: "Beverage",
            }
        ]
        
    });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });