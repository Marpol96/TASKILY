//funcion de como hacer metodo frances
const calcularMetodoFrances = (capital, tasaInteres, plazo) => {
    let cuota = 0;
    let cuotaFixed = 0;
    let deuda = capital;
    let mes = 0;
    let interes = 0;
    let interesFixed = 0;

    const cuotas = [];
    //transformar los años en meses
    plazo = math.round(plazo * 12);

    //cacular la cuota
    //en el metodo frances la cuota siempre es la misma
    cuota = (capital * (tasaInteres / 100)) / (1 - (1 + (tasaInteres / 100)) ** -plazo);
    cuotaFixed = cuota.toFixed(2);
    while (mes != plazo) {
        interes = deuda * (tasaInteres / 100);
        interesFixed = interes.toFixed(2);

        capital = cuotaFixed - interesFixed;

        deuda -= capital;

        mes++;

        cuotas.push({
            mes,
            capital,
            interesFixed,
            cuota,
            deuda,
        });
    }
    return cuotas;
};

//muestra el formulario
exports.metodoFrances = (req, res, next) => {
    res.send("formulario_prestamos");
};

//desplegar los valores
exports.mostrarMetodoFrances = (req, res, next) => {
    //realizar los calculos
    const { monto, tasaInteres, periodo } = req.body;
    const cuotas = calcularMetodoFrances(monto, tasaInteres, periodo);

    res.render("prestamo", { cuotas });
};