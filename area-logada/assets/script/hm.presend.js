async function presend(pw, type) {
  // Essa informação é a senha, que deve vim de um `<input>` por exemplo:
  let password = new TextEncoder().encode(pw);

  // Essa informação deve vim do banco de dados (ou derivado de outra entrada constante, que não seja a própria senha), isto deve ser única por usuário/senha:
  let salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).buffer;

  // Essa informação é a dificuldade da derivação:
  let iterations = 500000;
  let algo = 'SHA-512';

  const key = await window.crypto.subtle.importKey(
    'raw',
    password,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const pbkdf2 = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: iterations, hash: algo },
    key,
    { name: 'AES-CBC', length: 256 }, // Isso aqui é confusão do WebCrypto. Isso daqui é só para definir o tamanho final para 32bytes!
    true,
    ['encrypt', 'decrypt']
  );
  async function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  // Aqui você tem o resultado, a senha derivada:
  const result = await window.crypto.subtle.exportKey('raw', pbkdf2);
  let resultBase64 = await arrayBufferToBase64(result);
  console.log('rb64 ' + resultBase64);

  //console.log('hbc ' + hash);

  // bcrypt.compareSync(resultBase64, hash);
  // console.log('check ' + hash);

  if (type != 'login') {
    const bcrypt = await dcodeIO.bcrypt;
    const hash = await bcrypt.hashSync(resultBase64, 10);
    return hash;
  } else {
    return resultBase64;
  }
}
