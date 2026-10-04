-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS yamiventas_db;
USE yamiventas_db;

-- Tabla de Categorías
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de Productos (Zapatos)
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255),
    stock INT DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Insertar Categorías Iniciales
INSERT INTO categorias (nombre) VALUES 
('deportivo'), 
('casual'), 
('formal'), 
('urbano');

-- Insertar Productos
INSERT INTO productos (nombre, precio, id_categoria, imagen_url, stock) VALUES
('Nike Air Max', 120.00, 1, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 15),
('Adidas Ultraboost', 140.00, 1, 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500', 10),
('Mocasines de Cuero', 85.00, 3, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500', 8),
('Sneakers Urbanos', 65.00, 4, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500', 20),
('Sandalias Casuales', 45.00, 2, 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500', 12);