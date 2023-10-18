const { Rating, Product } = require('../db_connection');

async function updateProductRating(productId: any) {
  try {
    // Busca todas las calificaciones asociadas a un producto por productId
    const ratings = await Rating.findAll({
      where: {
        productId,
      },
    });
    
    // Ordena las calificaciones de forma ascendente (las más bajas primero)
    ratings.sort((a: any, b: any) => a.rating - b.rating);

    // Toma las 5 calificaciones más bajas
    const lowestRatings = ratings.slice(0, 5);

    // Toma las 5 calificaciones más altas
    const highestRatings = ratings.slice(-5);

    // Combina las calificaciones más bajas y las más altas
    const selectedRatings = [...lowestRatings, ...highestRatings];

    // Calcula el promedio de las calificaciones seleccionadas
    const totalRatings = selectedRatings.length;
    const totalRatingValue = selectedRatings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRatings > 0 ? Math.round(totalRatingValue / totalRatings * 2) / 2 : 0;

    // Actualiza el campo de rating en el modelo de Producto
    const product = await Product.findByPk(productId);
    if (product) {
      product.rating = averageRating;
      await product.save();
    }
  } catch (error) {
    console.error('Error al actualizar el rating del producto:', error);
  }
}

module.exports = {
  updateProductRating,
};
