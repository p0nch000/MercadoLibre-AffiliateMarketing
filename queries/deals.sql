SELECT p.id_product, p.title, l.permalink, l.affiliate_link, p.price, p.discount_percentage 
FROM links AS l
INNER JOIN products AS p ON l.id_product = p.id_product;