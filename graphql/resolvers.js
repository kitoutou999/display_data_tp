import { MongoClient } from 'mongodb';

// Connection URI
// version container
const uri = 'mongodb://root:example@mongodb:27017'
// version runtime
//const uri = 'mongodb://root:example@localhost:27017';

// Database Name
const dbName = 'bda';

// Collection Name
const collectionName = 'sales';

// Create a new MongoClient
const client = new MongoClient(uri);

await client.connect();
console.log('Connected successfully to the server');
const db = client.db(dbName);
const collection = db.collection(collectionName);

const aggregatePrestation = [
  {
    $group: {
      _id: {
        prestation_code: '$prestation.code',
        prestation_description: '$prestation.description'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      min: {
        $min: '$price'
      },
      max: {
        $max: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      id: '$_id.prestation_code',
      description: '$_id.prestation_description',
      sum: 1,
      avg: 1,
      min: 1,
      max: 1,
      count: 1,
      _id: 0
    }
  }
]

const aggregateDepartments = [
  {
    $group: {
      _id: {
        prestation_department: '$adresse.department.id'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      department: '$_id.prestation_department',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]

// quelques données d'exemple
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
]

// on définit une fonction qui effectue l'aggrégation voulue
async function aggregate(aggregation) {
    const result = await collection.aggregate(aggregation).toArray();
    return result;
}

async function aggregateWithValue(aggregation, key, value) {
 let newAggregation = [{$match: { [key] : value}}, ...aggregation]
 const result = await collection.aggregate(newAggregation).toArray();
 return result;
}

// un résolveur simple pour la requête 'books' de type Query
// qui renvoie la variable 'books'
const resolvers = {
    Query: {
	books: () => books,
	prestations (root, args, context) {
            return aggregate(aggregatePrestation)
	},
	departments (root, args, context) {
            return aggregate(aggregateDepartments)
	},
	prestationsByDpt (root, args, context) {
            return aggregateWithValue(aggregatePrestation, 'adresse.department.id', args.departement);
	}
    }
}

// on exporte la définition de 'resolvers'
export default resolvers;
