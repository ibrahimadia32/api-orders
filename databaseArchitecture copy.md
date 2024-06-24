Voici la traduction en français :

### Architecture de base de données avec Mongoose

#### 1. **Client**

**Champs**:

-   `customer_id` : Identifiant unique du client (type : String, requis)
-   `name` : Nom complet du client (type : String, requis)
-   `email` : Adresse e-mail du client (type : String, requis, unique)
-   `address` : Adresse physique du client (type : String)
-   `phone_number` : Numéro de téléphone du client (type : String)
-   `orders` : Liste des identifiants de commandes associés au client (type : [ObjectId], référence : `Order`)

#### 2. **Commande**

**Champs**:

-   `order_id` : Identifiant unique de la commande (type : String, requis)
-   `customer_id` : Identifiant du client ayant passé la commande (type : ObjectId, référence : `Customer`, requis)
-   `order_date` : Date de la commande (type : Date, requis)
-   `status` : Statut de la commande (type : String, énum : ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], requis)
-   `products` : Liste des produits commandés (type : [Object])
    -   `product_id` : Identifiant unique du produit (type : ObjectId, référence : `Product`, requis)
    -   `quantity` : Quantité du produit commandé (type : Number, requis)
    -   `price` : Prix unitaire du produit au moment de la commande (type : Number, requis)
-   `total_amount` : Montant total de la commande (type : Number, requis)

#### 3. **Produit**

**Champs**:

-   `product_id` : Identifiant unique du produit (type : String, requis)
-   `name` : Nom du produit (type : String, requis)
-   `description` : Description du produit (type : String)
-   `price` : Prix unitaire du produit (type : Number, requis)
-   `category` : Catégorie du produit (type : String)
-   `orders` : Liste des identifiants de commandes contenant ce produit (type : [ObjectId], référence : `Order`)
-   `stock` : Référence à l'entrée de stock associée à ce produit (type : ObjectId, référence : `Stock`)

#### 4. **Catégorie**

**Champs**:

-   `category_id` : Identifiant unique de la catégorie (type : String, requis)
-   `name` : Nom de la catégorie (type : String, requis)
-   `description` : Description de la catégorie (type : String)
-   `products` : Liste des identifiants de produits associés à cette catégorie (type : [ObjectId], référence : `Product`)

#### 5. **Stock**

**Champs**:

-   `product_id` : Identifiant unique du produit (type : ObjectId, référence : `Product`, requis)
-   `quantity_available` : Quantité disponible du produit (type : Number, requis)
-   `last_updated` : Date de la dernière mise à jour de la quantité (type : Date, requis)

### Relations entre les entités

1. **Client** et **Commande**

    - Un client peut passer plusieurs commandes (`Customer.orders` est une liste de références à `Order`).
    - Chaque commande appartient à un seul client (`Order.customer_id`).

2. **Commande** et **Produit**

    - Une commande peut contenir plusieurs produits (`Order.products` est une liste d'objets contenant des références à `Product`).
    - Un produit peut apparaître dans plusieurs commandes (`Product.orders` est une liste de références à `Order`).

3. **Produit** et **Catégorie**

    - Un produit appartient à une seule catégorie (`Product.category`).
    - Une catégorie peut contenir plusieurs produits (`Category.products` est une liste de références à `Product`).

4. **Produit** et **Stock**

    - Un produit a une entrée de stock associée (`Stock.product_id`).
    - Une entrée de stock correspond à un seul produit (`Stock.product_id`).

### Exemple de représentation JSON

#### Client

```json
{
    "customer_id": "CUST12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St, Anytown, AT 12345",
    "phone_number": "123-456-7890",
    "orders": ["ORDER123", "ORDER456"]
}
```

#### Commande

```json
{
    "order_id": "ORDER123",
    "customer_id": "CUST12345",
    "order_date": "2024-06-19T00:00:00Z",
    "status": "Processing",
    "products": [
        {
            "product_id": "PROD123",
            "quantity": 2,
            "price": 9.99
        },
        {
            "product_id": "PROD456",
            "quantity": 1,
            "price": 19.99
        }
    ],
    "total_amount": 39.97
}
```

#### Produit

```json
{
    "product_id": "PROD123",
    "name": "Coffee Bean",
    "description": "Premium quality coffee beans",
    "price": 9.99,
    "category": "CAT123",
    "orders": ["ORDER123", "ORDER789"]
}
```

#### Catégorie

```json
{
    "category_id": "CAT123",
    "name": "Beverages",
    "description": "All kinds of beverages",
    "products": ["PROD123", "PROD456"]
}
```

#### Stock

```json
{
    "product_id": "PROD123",
    "quantity_available": 100,
    "last_updated": "2024-06-19T00:00:00Z"
}
```

Cette architecture modifiée inclut la gestion des stocks avec la nouvelle entité `Stock`, tout en maintenant des relations appropriées entre les entités pour garantir une structure de données cohérente et efficace.
