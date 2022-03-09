export function goToLoginPage(history) {
 history('/login')
}
export function goToHomePage(history) {
 history('/')
}
export function gotToClassPage(history, id_modules) {
 history(`/module/${id_modules}`)
}