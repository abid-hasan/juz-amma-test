// Array of the number of verses in each surah of Juz Amma
const surahVerses = [
  40, // Surah 78: An-Naba
  46, // Surah 79: An-Nazi'at
  42, // Surah 80: Abasa
  29, // Surah 81: At-Takwir
  19, // Surah 82: Al-Infitar
  36, // Surah 83: Al-Mutaffifin
  25, // Surah 84: Al-Inshiqaq
  22, // Surah 85: Al-Buruj
  17, // Surah 86: At-Tariq
  19, // Surah 87: Al-A'la
  26, // Surah 88: Al-Ghashiyah
  30, // Surah 89: Al-Fajr
  20, // Surah 90: Al-Balad
  15, // Surah 91: Ash-Shams
  21, // Surah 92: Al-Layl
  11, // Surah 93: Ad-Duhaa
  8, // Surah 94: Ash-Sharh
  8, // Surah 95: At-Tin
  19, // Surah 96: Al-'Alaq
  5, // Surah 97: Al-Qadr
  8, // Surah 98: Al-Bayyinah
  8, // Surah 99: Az-Zalzalah
  11, // Surah 100: Al-'Adiyat
  11, // Surah 101: Al-Qari'ah
  8, // Surah 102: At-Takathur
  3, // Surah 103: Al-'Asr
  9, // Surah 104: Al-Humazah
  5, // Surah 105: Al-Fil
  4, // Surah 106: Quraysh
  7, // Surah 107: Al-Ma'un
  3, // Surah 108: Al-Kawthar
  6, // Surah 109: Al-Kafirun
  3, // Surah 110: An-Nasr
  5, // Surah 111: Al-Masad
  4, // Surah 112: Al-Ikhlas
  5, // Surah 113: Al-Falaq
  6, // Surah 114: An-Nas
];

let currentSurah = 78;
let currentAyah = 1;

function getRandomVerseFromJuzAmma() {
  const surahIndex = Math.floor(Math.random() * surahVerses.length);
  const versesInSurah = surahVerses[surahIndex];
  const verseNumber = Math.floor(Math.random() * versesInSurah) + 1;
  return {
    surah: surahIndex + 78,
    ayah: verseNumber
  };
}

function loadAyah(surah, ayah) {
  const imageUrl = `https://cdn.islamic.network/quran/images/high-resolution/${surah}_${ayah}.png`;
  document.getElementById('ayahImage').src = imageUrl;
}

function loadNextAyah() {
  let nextAyah = currentAyah + 1;
  let nextSurah = currentSurah;

  if (nextAyah > surahVerses[nextSurah - 78]) {
    nextSurah += 1;
    nextAyah = 1;

    // Check if it exceeds the bounds of Juz Amma
    if (nextSurah > 114) {
      nextSurah = 78; // Reset to the first Surah of Juz Amma
      nextAyah = 1;
    }
  }

  currentSurah = nextSurah;
  currentAyah = nextAyah;

  const nextImageUrl = `https://cdn.islamic.network/quran/images/high-resolution/${nextSurah}_${nextAyah}.png`;
  document.getElementById('ayahImage').src = nextImageUrl;
}

function loadPreviousAyah() {
  let previousAyah = currentAyah - 1;
  let previousSurah = currentSurah;

  if (previousAyah < 1) {
    previousSurah -= 1;
    previousAyah = surahVerses[previousSurah - 78];

    // Check if it exceeds the bounds of Juz Amma
    if (previousSurah < 78) {
      previousSurah = 114; // Reset to the first Surah of Juz Amma
      previousAyah = surahVerses[previousSurah - 78];
    }
  }

  currentSurah = previousSurah;
  currentAyah = previousAyah;

  const previousImageUrl = `https://cdn.islamic.network/quran/images/high-resolution/${previousSurah}_${previousAyah}.png`;
  document.getElementById('ayahImage').src = previousImageUrl;
}

document.getElementById('loadAyah').addEventListener('click', () => {
  const { surah, ayah } = getRandomVerseFromJuzAmma();
  currentSurah = surah;
  currentAyah = ayah;
  loadAyah(surah, ayah);
});

document.getElementById('loadNextAyah').addEventListener('click', loadNextAyah);
document.getElementById('loadPreviousAyah').addEventListener('click', loadPreviousAyah);

// JavaScript Function to scroll the Ayah image container to the right
function scrollContainerToRight() {
  const container = document.getElementById('ayahImageContainer');
  
  // For RTL languages like Arabic, scrolling to the maximum scroll width
  // will align the container to the right
  container.scrollLeft = container.scrollWidth;
}

// This function should be called every time the image is loaded or updated
document.getElementById('ayahImage').onload = scrollContainerToRight;