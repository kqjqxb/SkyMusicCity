import RNFS from 'react-native-fs';

export const moveFileToDocs = async (fileUri, fileName) => {
  const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  try {
    await RNFS.copyFile(fileUri, newPath);
    return newPath; // Повертає новий шлях
  } catch (error) {
    console.error('Помилка копіювання файлу:', error);
    return null;
  }
};
