class Usuario {
    constructor(nombre, apellido, libros, pets) {
        this.nombre= nombre;
        this.apellido= apellido;
        this.libros= libros;
        this.pets= pets;
    }
    
    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombre) {
        this.pets.push(nombre);
    }

    countMascotas(){
        return this.pets.length;
    }

    addBook(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor});
    }

    getBookNames() {
        return this.libros.map((libro) => libro.nombre)
    }
}

const usuario = new Usuario("Elon", "Musk", [{nombre: "Harry Potter y la Piedra Filosofal", autor:"J. K. Rowling"}], ["Perro", "Gato"]); 

console.log(usuario.getFullName());
usuario.addMascota("Hamster");
console.log(usuario.countMascotas());
usuario.addBook("Pride and Prejudice", "Jane Austen");
console.log(usuario.getBookNames());


