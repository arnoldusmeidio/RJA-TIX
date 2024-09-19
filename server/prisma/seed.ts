import { PrismaClient, Prisma, StudioType } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";

const prisma = new PrismaClient();

async function inputData() {
  console.log("Start seeding users...\n");

  const salt = await genSalt(10);
  const hashedPassword = await hash("password", salt);
  const userData: Prisma.UserCreateInput[] = [
    {
      id: "super-admin-000000000",
      name: "Super Momod",
      email: "momod@momod.com",
      password: hashedPassword,
      admin: {
        create: {},
      },
      manager: {
        create: {},
      },
      referral: {
        create: {},
      },
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    {
      id: "admin-000000001",
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      admin: {
        create: {},
      },
      referral: {
        create: {},
      },
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    {
      id: "manager-000000001",
      name: "Manager 1",
      email: "manager@1.com",
      password: hashedPassword,
      manager: {
        create: {},
      },
      referral: {
        create: {},
      },
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    {
      id: "manager-000000002",
      name: "Manager 2",
      email: "manager@2.com",
      password: hashedPassword,
      manager: {
        create: {},
      },
      referral: {
        create: {},
      },
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    {
      id: "manager-000000003",
      name: "Manager",
      email: "manager@3.com",
      password: hashedPassword,
      manager: {
        create: {},
      },
      referral: {
        create: {},
      },
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    {
      id: "user-234567890",
      name: "Roy",
      email: "roy@chen.com",
      password: hashedPassword,
      referral: {
        create: {},
      },
      wallet: {
        create: {},
      },
    },
    {
      id: "user-345678909",
      name: "Roni",
      email: "roni@josh.com",
      password: hashedPassword,
      referral: {
        create: {},
      },
      wallet: {
        create: {},
      },
    },
    {
      id: "user-456789098",
      name: "David",
      email: "david@chris.com",
      password: hashedPassword,
      referral: {
        create: {},
      },
      wallet: {
        create: {},
      },
    },
  ];

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Successfully create movie with id: ${user.id}`);
  }

  console.log("\nSeeding users finished!\n");

  console.log("\nStart seeding movies...\n");

  const movieData: Prisma.MovieCreateInput[] = [
    {
      title: "Twister",
      director: "Lee Isca Chung",
      genre: "ACTION",
      rated: "PG_13",
      duration: 122,
      synopsis:
        "Kate Carter bekerja di Oklahoma bersama teman-teman pemburu badainya Javi Addy  Praveen, dan pacarnya, Jeb. Bersama dengan Doppler Dorothy V, tim tersebut meluncurkan barel manik-manik natrium poliakrilat ke tornado dengan harapan dapat mengurangi intensitasnya dan mengamankan pendanaan untuk penelitian lebih lanjut.",
      releaseYear: 2024,
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330042/movie rja_tix/Action_1.jpg",
    },
    {
      title: "Godzilla x Kong",
      director: "Adam Wingard",
      genre: "ACTION",
      rated: "PG_13",
      duration: 115,
      releaseYear: 2024,
      synopsis:
        "Film ini berlatar belakang dunia yang damai setelah pertarungan terakhir antara Godzilla dan Kong. Film dimulai dengan adegan Kong yang berburu monster lain yang bernama Wartdogs. Sementara Dr. Ilene Andrews sedang bekerja untuk memisahkan Godzilla dan Kong. Di tempat lain Godzilla mempertahankan kekuasaannya dengan membunuh monster yang menyebabkan kekacauan.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330153/movie%20rja_tix/Action_2.jpg",
    },
    {
      title: "Damsel",
      director: "Juan Carlos",
      genre: "ACTION",
      rated: "PG_13",
      duration: 110,
      releaseYear: 2024,
      synopsis:
        "Elodie merupakan seorang bangsawan yang terperangkap di kehidupannya sendiri. Elodie sudah memiliki garis tangan masa depan yang sudah dituliskan oleh orang tuanya. Sang putri mesti menikahi seorang pangeran tampan yang mau tak mau dia setujui. Pangeran tampan yang bakal menjadi suaminya kelak itu bernama Henry. Ia merupakan anak dari Sang Raja (Ray Winstone) dan Ratu Isabelle. Elodie pun dipertemukan dengan Henry dan keduanya hubungan mereka mulai terjalin. Hingga akhirnya keduanya pun sepakat untuk menikah.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330194/movie%20rja_tix/Action_3.jpg",
    },
    {
      title: "Bad Boys : Ride Or Die",
      director: "Adil El Arbi",
      genre: "ACTION",
      rated: "PG_13",
      duration: 115,
      releaseYear: 2024,
      synopsis:
        "Detektif Mike Lowrey menikah dengan ahli terapi fisiknya, Christine. Selama resepsi, rekannya, Detektif Marcus Burnett, menderita serangan jantung ringan dan mengalami koma, di mana dia mendapat penglihatan mendiang Kapten Conrad Howard yang mengatakan kepadanya bahwa ini bukan waktunya.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330238/movie%20rja_tix/Action_4.jpg",
    },
    {
      title: "Fighter",
      director: "Siddhart Anand",
      genre: "ACTION",
      rated: "PG",
      duration: 166,
      releaseYear: 2024,
      synopsis:
        "Detektif Mike Lowrey menikah dengan ahli terapi fisiknya, Christine. Selama resepsi, rekannya, Detektif Marcus Burnett, menderita serangan jantung ringan dan mengalami koma, di mana dia mendapat penglihatan mendiang Kapten Conrad Howard yang mengatakan kepadanya bahwa ini bukan waktunya.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330266/movie%20rja_tix/Action_5.jpg",
    },
    {
      title: "Inside Out 2",
      director: "Kelsey Almand",
      genre: "ANIMATION",
      rated: "G",
      duration: 96,
      releaseYear: 2024,
      synopsis:
        "Disney and Pixar’s “Inside Out 2” menelusuri kembali benak Riley yang sudah remaja saat headquarter mengalami pembongkaran mendadak untuk memberi ruang bagi sesuatu yang sama sekali tidak terduga: Emosi baru! Joy, Sadness, Anger, Fear, dan Disgust, yang telah lama menjalankan operasinya dengan sukses, tidak yakin bagaimana perasaan mereka ketika Anxiety muncul. Dan sepertinya dia tidak sendirian.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330404/movie%20rja_tix/Animasi_1.jpg",
    },
    {
      title: "Despicable Me 4",
      director: "Chris Renaud",
      genre: "ANIMATION",
      rated: "G",
      duration: 94,
      releaseYear: 2024,
      synopsis:
        "Despicable Me 4 adalah film komedi animasi Amerika yang akan datang diproduksi oleh Illumination dan didistribusikan oleh Universal Pictures. Film ini akan bertindak sebagai sekuel bagi film Despicable Me 3, film utama keempat, dan film keenam secara keseluruhan di waralaba Despicable Me.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330437/movie%20rja_tix/Animasi_2.jpg",
    },
    {
      title: "Garfield Movie",
      director: "Mark Dindal",
      genre: "ANIMATION",
      rated: "G",
      duration: 101,
      releaseYear: 2024,
      synopsis:
        "Saat mempersiapkan pencurian, Garfield dan Vic sering bentrok satu sama lain, memaksa Odie dan Otto mengikat keduanya ke pohon. Selama perdebatan sengit, Vic dengan sedih mengungkapkan apa yang terjadi pada malam dia meninggalkannya: dia sebenarnya mendapatkan makanan untuk Garfield di seberang gang tetapi butuh waktu terlalu lama untuk kembali kepadanya. Ketika akhirnya dia melakukannya, dia melihat dia dirawat oleh Jon di restoran Italia tempat dia pergi.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330465/movie%20rja_tix/Animasi_3.jpg",
    },
    {
      title: "Kungfu Panda 4",
      director: "Mike Mitchel",
      genre: "ANIMATION",
      rated: "G",
      duration: 94,
      releaseYear: 2024,
      synopsis:
        "Setelah Po ditunjuk untuk menjadi Pemimpin Spiritual Lembah Damai, dia perlu menemukan dan melatih Prajurit Naga baru, sementara seorang penyihir jahat berencana memanggil kembali semua penjahat ulung yang telah dikalahkan Po ke alam roh.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330492/movie%20rja_tix/Animasi_4.jpg",
    },
    {
      title: "Flow",
      director: "Glintz Zibalodis",
      genre: "ANIMATION",
      rated: "G",
      duration: 85,
      releaseYear: 2024,
      synopsis:
        "low adalah film fantasi petualangan animasi tahun 2024 yang disutradarai oleh Gints Zilbalodis dan ditulis oleh Zilbalodis dan Matīss Kaža.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330529/movie%20rja_tix/Animasi_5.jpg",
    },
    {
      title: "Incoming",
      director: "Jhon Chernin",
      genre: "COMEDY",
      rated: "PG",
      duration: 91,
      releaseYear: 2024,
      synopsis:
        "Benj adalah anak kutu buku yang tiba-tiba naksir kakak kelasnya dan akan melakukan apa saja untuk menjadi keren. Dia memiliki seorang kakak perempuan yang jahat, Alyssa (Ali Gallo). Bailey (Isabella Ferreira), gadis yang ditaksir Benj, adalah satu-satunya yang menoleransi sisi jahat Alyssa dan menjadi sahabatnya.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330658/movie%20rja_tix/comedy_1.jpg",
    },
    {
      title: "Jackpot",
      director: "Paul Felg",
      genre: "COMEDY",
      rated: "R",
      duration: 106,
      releaseYear: 2024,
      synopsis:
        "pemerintah California yang putus asa secara finansial menciptakan Lotere Besar yang mematikan: setiap Hari Lotere, pemenang yang dipilih secara acak harus bertahan hingga matahari terbenam; siapa pun yang tiketnya kalah dapat membunuh pemenangnya untuk mengklaim hadiah jutaan dolar, tetapi tidak seorang pun boleh menggunakan senjata.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725330700/movie%20rja_tix/comedy_2.jpg",
    },
    {
      title: "FallGuy",
      director: "David Leitch",
      genre: "COMEDY",
      rated: "PG",
      duration: 124,
      releaseYear: 2024,
      synopsis:
        "kehidupan seorang stuntman bernama Colt Seavers yang diperankan oleh Ryan Gosling. Layaknya stuntman, dia diledakkan, ditembak, ditabrak, dilempar melalui jendela dan dijatuhkan dari ketinggian, semua demi menghibur penonton.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350150/movie%20rja_tix/comedy_3.jpg",
    },
    {
      title: "Agak Laen",
      director: "Muhadklay Acho",
      genre: "COMEDY",
      rated: "PG_13",
      duration: 110,
      releaseYear: 2024,
      synopsis:
        "Empat teman yang menjalankan sebuah rumah hantu mencari cara-cara baru untuk menakuti pengunjung. Namun, berbagai masalah muncul setelah mereka bertindak terlalu jauh.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350175/movie%20rja_tix/comedy_4.jpg",
    },
    {
      title: "Pasutri Gaje",
      director: "Fajar Bustomi",
      genre: "COMEDY",
      rated: "PG",
      duration: 110,
      releaseYear: 2024,
      synopsis:
        "Pasangan pengantin baru menjalani naik turunnya kehidupan pernikahan sambil menghadapi tantangan dalam memulai sebuah keluarga.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350209/movie%20rja_tix/comedy_5.jpg",
    },
    {
      title: "The Killer",
      director: "David Fincher",
      genre: "CRIME",
      rated: "NC_17",
      duration: 118,
      releaseYear: 2024,
      synopsis:
        "Penyendiri, dingin, metodis, dan tak terbebani oleh rasa ragu ataupun penyesalan, sang pembunuh menunggu dalam bayang-bayang, mengintai target berikutnya. Namun semakin lama menunggu, ia semakin merasa kehilangan akal sehatnya, bahkan ketenangannya.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350245/movie%20rja_tix/crime_1.jpg",
    },
    {
      title: "Nobody",
      director: "Ilya Naishuler",
      genre: "CRIME",
      rated: "NC_17",
      duration: 92,
      releaseYear: 2011,
      synopsis:
        "Pemenang Emmy Bob Odenkirk (Better Call Saul, The Post, Nebraska) berperan sebagai Hutch Mansell, ayah dan suami yang sering diremehkan dan diabaikan, namun Ketika dua pencuri masuk ke rumahnya di pinggiran kota pada suatu malam, Hutch menolak untuk membela diri atau keluarganya, berharap untuk mencegah kekerasan yang serius.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350278/movie%20rja_tix/crime_2.jpg",
    },
    {
      title: "The Raid",
      director: "Gareth Evans",
      genre: "CRIME",
      rated: "NC_17",
      duration: 102,
      releaseYear: 2011,
      synopsis:
        "jauh di jantung daerah kumuh Jakarta berdiri sebuah gedung apartemen teantar yang tak tertembus dan menjadi rumah aman bagi gangster, penjahat dan pembunuh yang paling berbahaya. Blok apartemen kumuh tersebut dianggap tak terjangkau oleh para rival gembong narkoba terkenal Tama Riyadi (Ray Sahetapy), bahkan untuk petugas polisi paling berani sekalipun.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350308/movie%20rja_tix/crime_3.jpg",
    },
    {
      title: "Baby Driver",
      director: "Edgar Wright",
      genre: "CRIME",
      rated: "NC_17",
      duration: 115,
      releaseYear: 2017,
      synopsis:
        "Baby (Ansel Elgort) adalah seorang pemuda yang bekerja sebagai pengemudi untuk kelompok bank di Atlanta, Georgia. Ketika ia masih kecil, sebuah kecelakaan mobil membunuh orang tua dan meninggalkannya bersama tinitus, yang ia blokir dengan mendengarkan musik di iPod. Ia membawa anggota meringkuk yang dikerahkan oleh Doc (Kevin Spacey).",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350337/movie%20rja_tix/crime_4.jpg",
    },
    {
      title: "Get Out",
      director: "Jordan Peele",
      genre: "CRIME",
      rated: "NC_17",
      duration: 104,
      releaseYear: 2017,
      synopsis:
        "Seorang fotografer berkulit hitam bernama Chris Washington (Daniel Kaluuya) terpaksa menyetujui keinginan kekasihnya yang berkulit putih, Rose Armitage (Allison Williams), untuk bertemu dengan orang tua dari sang kekasih. Chris tidak yakin mereka tidak menyambutnya dengan hangat.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350360/movie%20rja_tix/crime_5.jpg",
    },
    {
      title: "It End With Us",
      director: "Justin Buldoni",
      genre: "ROMANCE",
      rated: "PG_13",
      duration: 131,
      releaseYear: 2024,
      synopsis:
        "Lily Bloom mengunjungi kampung halamannya di Plethora, Maine, untuk menyampaikan pidato di pemakaman ayahnya. Di podium, dia berkata bahwa dia akan menyebutkan lima hal favoritnya tentang suaminya, lalu berdiri diam selama beberapa detik sebelum pergi. ",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350574/movie%20rja_tix/romance_1.jpg",
    },
    {
      title: "Secret Hidden Score",
      director: "Hayato Kawai",
      genre: "ROMANCE",
      rated: "PG",
      duration: 120,
      releaseYear: 2024,
      synopsis:
        "Keduanya pun mulai menjalin hubungan pertemanan setelah pertemuan itu. Tidak disangka, Minato mulai jatuh hati terhadap Yukino yang terlihat ceria dari luar namun tampak menyimpan rahasia dalam dirinya. Minato juga jatuh cinta dengan Yukino karena permainan pianonya yang indah.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350598/movie%20rja_tix/romance_2.jpg",
    },
    {
      title: "Badarawuhi Di Desa Penari",
      director: "Kimo Stamboel",
      genre: "HORROR",
      rated: "PG_13",
      duration: 122,
      releaseYear: 2024,
      synopsis:
        "Mila, bersama dengan sepupunya, Yuda, dan sahabat mereka, Arya dan Jito, pergi menuju ke sebuah desa terpencil di tengah hutan yang dikenal sebagai Desa Penari. Mila percaya bahwa jika dia mengembalikan sebuah gelang antik milik Badarawuhi, sesosok entitas gaib yang menguasai desa tersebut, dapat menyembuhkan penyakit ibunya. Namun, setelah Mila berhasil mengembalikan gelang tersebut, keadaan justru malah semakin memburuk.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350387/movie%20rja_tix/horror_1.jpg",
    },
    {
      title: "Evil Dead Rise",
      director: "Lee Cronin",
      genre: "HORROR",
      rated: "R",
      duration: 92,
      releaseYear: 2023,
      synopsis:
        "Evil Dead Rise menceritakan kisah mengejutkan tentang dua saudara perempuan yang terasing yang reuninya dipersingkat oleh munculnya setan yang merasuki manusia, mendorong mereka ke dalam pertempuran utama untuk bertahan hidup saat mereka menghadapi versi keluarga paling mengerikan yang bisa dibayangkan.",
      posterUrl:
        "https://res.cloudinary.com/dowznhveo/image/upload/v1725350442/movie%20rja_tix/horror_3.jpg",
    },
  ];

  for (const m of movieData) {
    const movie = await prisma.movie.create({
      data: m,
    });
    console.log(`Successfully create movie with title: ${movie.title}`);
  }

  console.log("\nSeeding movies finished!");

  console.log("\nStart seeding cinemas...\n");

  const studioData = [
    {
      price: 30000,
      studioType: StudioType.STARIUM,
      rows: 15,
      columns: 10,
    },
    {
      price: 40000,
      studioType: StudioType.FOUR_DX,
      rows: 12,
      columns: 12,
    },
    {
      price: 60000,
      studioType: StudioType.GOLD_CLASS,
      rows: 10,
      columns: 10,
    },
    {
      price: 100000,
      studioType: StudioType.PRIVATE_BOX,
      rows: 4,
      columns: 4,
    },
  ];

  const cinemaStudio = studioData.map((item, index) => {
    const { rows, columns } = item;
    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        seats.push({ row, column });
      }
    }
    return {
      number: index + 1,
      studioType: item.studioType,
      price: Number(item.price),
      seats: {
        create: seats,
      },
    };
  });

  const cinemaData: Prisma.CinemaCreateInput[] = [
    {
      name: "Plaza Indonesia",
      managers: {
        connectOrCreate: {
          where: { id: "manager-000000001" },
          create: { id: "manager-000000001" },
        },
      },
      address: "Indonesia",
      studios: {
        create: cinemaStudio,
      },
    },
    {
      name: "Mall of Indonesia",
      managers: {
        connectOrCreate: {
          where: { id: "manager-000000002" },
          create: { id: "manager-000000002" },
        },
      },
      address: "Indonesia",
      studios: {
        create: cinemaStudio,
      },
    },
    {
      name: "Grand Indonesia",
      managers: {
        connectOrCreate: {
          where: { id: "manager-000000003" },
          create: { id: "manager-000000003" },
        },
      },
      address: "Indonesia",
      studios: {
        create: cinemaStudio,
      },
    },
  ];

  for (const c of cinemaData) {
    const cinema = await prisma.cinema.create({
      data: c,
    });
    console.log(`Successfully create movie with title: ${cinema.name}`);
  }

  console.log("\nSeeding cinemas finished!");

  console.log("\nStart seeding showtimes...\n");

  const showtimeData: Prisma.ShowtimeCreateInput[] = [
    {
      movie: {
        connect: {
          id: 1,
        },
      },
      studio: {
        connect: {
          id: 1,
        },
      },
      startTime: new Date("2026-09-18T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 2,
        },
      },
      studio: {
        connect: {
          id: 1,
        },
      },
      startTime: new Date("2026-09-18T09:00:00"),
    },
    {
      movie: {
        connect: {
          id: 3,
        },
      },
      studio: {
        connect: {
          id: 6,
        },
      },
      startTime: new Date("2026-09-18T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 1,
        },
      },
      studio: {
        connect: {
          id: 1,
        },
      },
      startTime: new Date("2026-09-19T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 4,
        },
      },
      studio: {
        connect: {
          id: 1,
        },
      },
      startTime: new Date("2026-09-19T09:00:00"),
    },
    {
      movie: {
        connect: {
          id: 5,
        },
      },
      studio: {
        connect: {
          id: 2,
        },
      },
      startTime: new Date("2026-09-19T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 6,
        },
      },
      studio: {
        connect: {
          id: 2,
        },
      },
      startTime: new Date("2026-09-19T21:00:00"),
    },
    {
      movie: {
        connect: {
          id: 6,
        },
      },
      studio: {
        connect: {
          id: 6,
        },
      },
      startTime: new Date("2026-09-19T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 7,
        },
      },
      studio: {
        connect: {
          id: 6,
        },
      },
      startTime: new Date("2026-09-18T09:00:00"),
    },
    {
      movie: {
        connect: {
          id: 8,
        },
      },
      studio: {
        connect: {
          id: 5,
        },
      },
      startTime: new Date("2026-09-20T06:00:00"),
    },
    {
      movie: {
        connect: {
          id: 3,
        },
      },
      studio: {
        connect: {
          id: 5,
        },
      },
      startTime: new Date("2026-09-18T06:00:00"),
    },
  ];

  for (const s of showtimeData) {
    const showtime = await prisma.showtime.create({
      data: s,
    });
    console.log(`Successfully create movie with title: ${showtime.id}`);
  }

  console.log("\nSeeding showtimes finished!");

  console.log("\nSeeding COMPLETE!");
}

inputData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect;
    process.exit(1);
  });
