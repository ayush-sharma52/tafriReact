// src/services/PasswordHashingService.ts
export const PasswordHashingService = {
    // Generate a hashed password using SHA-256
    hashPassword: async (password: string): Promise<string> => {
      // Encode the password as a UTF-8 byte array
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
  
      // Generate the SHA-256 hash using the SubtleCrypto API
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
      // Convert the hash buffer to a hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
      return hashHex;
    },
  
    // Verify a password against a hashed password
    verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
      // Hash the input password
      const hashedInputPassword = await PasswordHashingService.hashPassword(password);
  
      // Compare the hashed input password with the stored hash
      return hashedInputPassword === hashedPassword;
    },
  };
  