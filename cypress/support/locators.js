//usarei xpath quando forem adicionadas atributos para teste

const locators = {
    LOGIN:{
        USER: '#email',
        PASSWORD: '#password',
        BTN_LOGIN: 'form > .MuiButton-root',
        MESSAGE: ':nth-child(1) > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .SnackbarItem-wrappedRoot > .SnackbarContent-root'
    },
    PEDIDOS:{
        BTN_1ESPERA: ':nth-child(2) > .MuiCardContent-root > :nth-child(6) > .css-mlcli7-MuiContainer-root > .MuiButtonBase-root > svg > path',
        BTN_1PREPARO: ':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > :nth-child(6) > .css-mlcli7-MuiContainer-root > .MuiButtonBase-root > svg > path',
        BTN_1REVISAO: ':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-13o7eu2 > .css-mlcli7-MuiContainer-root > .MuiButtonBase-root > svg > path',
        BTN_SELECT: ':nth-child(1) > :nth-child(2) > .MuiCardContent-root > .css-1f0cw7y-MuiContainer-root > .MuiButtonBase-root > svg',
        BTN_CANCELAR: '.css-kayhy9-MuiButtonBase-root-MuiMenuItem-root',
        //BTN_1MOTOBOY: '.css-m9e9eu > .css-wfzxlf',
        //BTN_1ENTREGA: '.css-m9e9eu > .css-1q0ebkh',
        BTN_VISUALIZAR: ':nth-child(2) > .MuiCardContent-root > .css-g3qzgg > .MuiBox-root > .css-1gg8xiz'
    },
    PLANO:{
        BTN_PLANO: '.css-1xhj18k > .MuiButtonBase-root'
    }
}


export default locators