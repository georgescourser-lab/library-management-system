import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genreNames = ['Fiction', 'Science Fiction', 'Mystery', 'Biography', 'Fantasy'];

  const genres = await Promise.all(
    genreNames.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const [fiction, scienceFiction, mystery, biography, fantasy] = genres;

  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genreId: fiction.id },
    { title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780061122415', genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', genreId: fiction.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreId: scienceFiction.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', genreId: scienceFiction.id },
    { title: 'Ender\'s Game', author: 'Orson Scott Card', isbn: '9780812550702', genreId: scienceFiction.id },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', genreId: scienceFiction.id },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', isbn: '9780141032140', genreId: mystery.id },
    { title: 'The Maltese Falcon', author: 'Dashiell Hammett', isbn: '9780679748603', genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', genreId: mystery.id },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307454546', genreId: mystery.id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', genreId: biography.id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553577129', genreId: biography.id },
    { title: 'Steve Jobs', author: 'Walter Isaacson', isbn: '9781451648539', genreId: biography.id },
    { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', genreId: biography.id },
    { title: 'The Hobbit', author: 'J. R. R. Tolkien', isbn: '9780547928227', genreId: fantasy.id },
    { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', isbn: '9780547773742', genreId: fantasy.id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404734', genreId: fantasy.id },
    { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', isbn: '9780765350381', genreId: fantasy.id },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log(`Seeded ${genres.length} genres and ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
