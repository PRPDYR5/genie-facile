// Fonction pour convertir une URL Google Drive en URL embarquable
export const convertGoogleDriveUrl = (url: string): string => {
  // Extrait l'ID du document de l'URL Google Drive
  const fileId = url.match(/[-\w]{25,}/);
  if (!fileId) {
    console.error("ID du fichier Google Drive non trouvé dans l'URL:", url);
    return url;
  }
  
  // Retourne l'URL embarquable
  return `https://drive.google.com/file/d/${fileId[0]}/preview`;
};