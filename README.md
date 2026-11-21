# Library Management System

## Data layer

The catalog uses Prisma with PostgreSQL and includes `User`, `Role`, `Genre`, `Book`, and `Review` models.

## Schema Decisions

A `Book` references a `Genre` through `genreId` and a Prisma `@relation`, rather than embedding the genre name or an entire genre object in every book. This keeps genre data normalized, prevents inconsistent names, allows a genre to have many books, and makes adding or updating genre metadata possible from one place.

With Prisma, relations are explicit and foreign keys are represented through scalar fields and `@relation` attributes. The relational model also requires migrations and handles model changes differently than a document database, where genre data could be embedded in documents but might become duplicated and harder to update consistently.

## Setup

1. Copy `api/.env.example` to `api/.env` and replace the placeholder values with your hosted PostgreSQL connection string.
2. Install dependencies: `npm install`
3. Generate Prisma Client: `npm run prisma:generate`
4. Apply the Prisma migration: `npm run prisma:migrate`
5. Run the seed: `npm run prisma:seed`
6. Verify the required assignment structure: `npm run verify:assignment`

Do not commit `api/.env` or a real database URL. A migration must be applied to the hosted PostgreSQL database before running the seed.

The seed inserts 5 genres and 20 books (4 books per genre).

## Scripts

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply a development migration
- `npm run prisma:seed` - Insert genres and books
