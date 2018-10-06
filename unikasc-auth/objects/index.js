const accessTokenUserJwtObject = {
  subject: "unikasc-access-token-user",
	algorithm: "HS256",
	expiresIn: "7d",
	issuer: "https://github.com/alfanhib",
	header: {
		typ: "JWT"
	}
}

module.exports = {
  accessTokenUserJwtObject
}