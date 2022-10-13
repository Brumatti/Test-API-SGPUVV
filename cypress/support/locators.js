//usarei xpath quando forem adicionadas atributos para teste

const locators = {
    LOGIN:{
        USER: '#email',
        PASSWORD: '#password',
        BTN_LOGIN: 'form > .MuiButton-root',
        MESSAGE: ':nth-child(1) > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .SnackbarItem-wrappedRoot > .SnackbarContent-root'
    },
    PEDIDOS:{
        BTN_1ESPERA: ':nth-child(2) > .MuiCardContent-root > :nth-child(6) > .css-1vtcjfp > .MuiButtonBase-root > svg > path',
        BTN_1PREPARO: ':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > :nth-child(6) > .css-1vtcjfp > .MuiButtonBase-root > svg > path',
        BTN_1REVISAO: ':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-13o7eu2 > .css-1vtcjfp > .MuiButtonBase-root > svg > path',
        BTN_SELECT: ':nth-child(1) > :nth-child(2) > .MuiCardContent-root > .css-g3qzgg > .MuiButtonBase-root > svg',
        BTM_SELECTSECOND: ':nth-child(1) > :nth-child(2) > .MuiCardContent-root > .css-g3qzgg > .MuiButtonBase-root > svg',
        BTN_CANCELAR: '.css-jx4bfm',
        //BTN_1MOTOBOY: '.css-m9e9eu > .css-wfzxlf',
        //BTN_1ENTREGA: '.css-m9e9eu > .css-1q0ebkh',
        BTN_VISUALIZAR: '.css-1km1ehz'
    },
    PLANO:{
        BTN_PLANO: '.css-1xhj18k > .MuiButtonBase-root'
    }
}


export default locators