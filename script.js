"use strict"

let f_hora_atual = document.getElementById("f_hora_atual")
let label_def = document.getElementById("label_def")
let f_hora_defenida = document.getElementById("f_hora_defenida")
let f_formato = document.getElementById("f_formato")
let options = document.querySelectorAll("#f_formato option")
let btn_ativar = document.getElementById("btn_ativar")
let btn_parar = document.getElementById("btn_parar")

let som_alarme = new Audio("som-alarme.mp3")
som_alarme.loop = 3
som_alarme.load()
som_alarme.volume = 0.9
let hora_defenida = null
let alarme_ativado = false

btn_ativar.onclick = () => {
    label_def.innerHTML = "Horário defenido:"
    f_formato.setAttribute("disabled","disabled")
    f_hora_defenida.setAttribute("disabled","disabled")
    btn_ativar.setAttribute("disabled","disabled")

    alarme_ativado = true

    if(options[0].selected) {
        hora_defenida = `${f_hora_defenida.value} AM`
    } else if(options[1].selected) {
        hora_defenida = `${f_hora_defenida.value} PM`
    }
} 

btn_parar.onclick = () => {
    label_def.innerHTML = "Defenir horário:"
    f_formato.removeAttribute("disabled","disabled")
    f_hora_defenida.removeAttribute("disabled","disabled")
    btn_ativar.removeAttribute("disabled","disabled")
    f_hora_defenida.removeAttribute("class","active")
    
    alarme_ativado = false
    som_alarme.pause()
    f_hora_defenida.value = ""
}

function hora() {
    const date = new Date()
    let hora = ("0" + date.getHours()).slice(-2)
    let minu =  ("0" + date.getMinutes()).slice(-2)

    f_hora_atual.value = `${hora}:${minu} ${hora < 12 ? "AM" : "PM"}`

    if(alarme_ativado) {
        if(f_hora_atual.value == hora_defenida) {
            som_alarme.play()
            f_hora_defenida.setAttribute("class","active")
        }
    }
}

window.onload = () => {setInterval(hora,1000)}