export default {
  generateNextId: (existingIds) => {
    let maxNum = 0;
    

    if (existingIds && existingIds.length > 0) {
      existingIds.forEach(id => {
        if (id && id.startsWith("PET")) {
          const numPart = parseInt(id.replace("PET", ""));
          if (!isNaN(numPart) && numPart > maxNum) {
            maxNum = numPart;
          }
        }
      });
    }
    
    const nextNum = maxNum + 1;
    return "PET" + String(nextNum).padStart(3, "0");
  }
}