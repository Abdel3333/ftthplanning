export default () => ({
    database: {
      uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/ftth'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'hQSnyLKDdut66wzzc0QmvjviL02j_MFyDewnDVyanem4Qmm0m9Xfs7hWmp0N6buOShGZEEm-XcEDFs77EeMvS9NiDHSg66UfFzwcz3hiEthahRikH8K1hXz9qSXNVzdISjpgHhduIm5DGorFVYV6NYUEz297rmsiQG43FwbLUDg',
    },
});