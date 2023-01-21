// PAGINA WEB PARA PAGAR SERVICIOS

alert("Bienvenido a TODOPAGO");

// array del carrito de pago

const cart = [];

// array con objetos de servicios

const services = [
    {
        id: 1,
        nombre: "Agua",
        empresa: "AguaCba",
        precio: 1,
        cantidad: 0,
    },
    {
        id: 2,
        nombre: "Luz",
        empresa: "Epec",
        precio: 1,
        cantidad: 0,
    },
    {
        id: 3,
        nombre: "Gas",
        empresa: "EcoGas",
        precio: 1,
        cantidad: 0,
    },
    {
        id: 4,
        nombre: "Internet",
        empresa: "Fibertel",
        precio: 1,
        cantidad: 0,
    },
];

// DECLARO VARIABLES

let userName;
let balance = 0;
let entry;
let depositMoney = true;
let addedServices;
let cantidadTotal;

// DECLARO FUNCIONES BASICAS

const currentBalance = () => alert(userName + ', su saldo en la cuenta es de $' + balance);

// lista ordenada de A - Z
const listAZ = () => {services.sort((a, b) => a.nombre.localeCompare(b.nombre));
    serviceList();
};


// lista ordenada de Z - A
const listZA = () => {services.reverse((a, b) => a.nombre.localeCompare(b.nombre));
    serviceList();
};


// Funcion para ver la lista de servicios y su respectiva empresa
const serviceList = () => {
    const companyServices = services.map((service) => {
        return `${service.nombre} (${service.empresa})`;
    });
    alert(
        `Servicios disponibles para pagar: \n\n${companyServices.join("\n")}`
    );
    pay(companyServices);
};

//funcion de pago de servicios
const pay = (companyServices) => {
    let serviceName = "";
    let addService = false;
    do {
        serviceName = prompt(
            `¿Qué Servicio desea pagar?\n\n${companyServices.join("\n")}`
        );
        serviceAmount = parseInt(prompt("¿Cuanto desea abonar por el servicio seleccionado?"));
        //while por si no ingresa un monto (Dinero)
        while (Number.isNaN(serviceAmount) || serviceAmount <= 0) {
            if (serviceAmount <= 0) {
                alert("Debe ingresar un monto mayor a cero");
            } else {
                alert("Debe ingresar un monto");
            }
            serviceAmount = parseInt(prompt("¿Cuanto desea abonar por el servicio seleccionado?"));
        }
        //Busca el servicio dentro de array de servicios
        const service = services.find(
            (service) =>
            service.nombre.toLowerCase() === serviceName.toLowerCase()
        );
        if (service) {
            addToCart(service, service.id,);
        } else {
            alert("Servicio no encontrado, seleccione uno de la lista");
        }
        addService = confirm(
            "¿Desea agregar mas servicios para abonar?"
        );
    } while (addService);
    confirmPayment();
};

// Funcion para agregar servicios al carrito. si el servicio es repetido, me deja agregarle mas dinero al monto total.

const addToCart = (service, serviceId) => {
    const repeatService = cart.find(
        (service) => service.id === serviceId
    );
    if (!repeatService) {
        cart.push(service);
        service.cantidad = serviceAmount;
    } else {
        service.cantidad += serviceAmount;
    }
};

// Funcion para confirmar el listado de servicios a pagar,
const confirmPayment = () => {
    addedServices = cart.map((service) => {
        return `${service.empresa} (${service.nombre}) ------------- Monto a pagar: $${service.cantidad}`;
    });
    alert(`Servicios seleccionados:\n\n${addedServices.join("\n")}\n\nPara confirmar la compra presione 'Aceptar'`);
    finishPayment(addedServices);
};

// Funcion para que el usuario vizualice su pago, y el saldo de su cuenta.
const finishPayment = (addedServices) => {
    const finaPrice = cart.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    alert(
        `Usted a pagado los siguientes servicios: \n\n${addedServices.join("\n")}\n\nTOTAL: $ ${finaPrice}
        \n\nEl saldo disponible en su cuenta es de $${balance - finaPrice}`
    );
};


// funcion que consulta al usuario como quiere visualizar el orden de la lista de servicios
const orderList = () => {
    const ascendingList = confirm("¿Ver los servicios en orden alfabetico (A-Z)?");
    if (ascendingList) {
        listAZ();
    } else {
        const descendingList = confirm("¿Ver los servicios en orden alfabetico (Z-A)?");
        if (descendingList) {
            listZA();
        } else {
            serviceList();
        }
    }
};

// COMIENZA LA EJECUCION

// NOMBRE DE USUARIO

do {
    userName = prompt('Indique su nombre de usuario');
} while (userName === "" );

alert('Nombre de usuario ingresado : ' + userName);

// Saldo del usuario

currentBalance();

while (depositMoney) {
    option = parseInt(prompt('¿Desea depositar dinero?\n Indique la opcion 2 si desea pasar a la seccion de pago\n 1) SI \n 2) NO'));
    if (option === 1) {
        entry = parseInt(prompt('Ingrese el dinero'));
        if (isNaN(entry)) {
            alert('Ingresá un monto válido');
        } else {
            balance += entry;
            alert(`Su saldo es de $${balance}`);
        }
    } else if (option === 2) {
        currentBalance();
        depositMoney = false;
    } else {
        alert('Opción inválida');
    }
}

orderList();

alert('Gracias por utilizar TODOPAGO')