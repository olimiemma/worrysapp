import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new DynamoDB.DocumentClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, words } = req.body;
    
    const params = {
      TableName: process.env.DYNAMODB_TABLE || 'UserWords',
      Item: {
        id: uuidv4(),
        name,
        words,
        timestamp: new Date().toISOString()
      }
    };

    try {
      await dynamodb.put(params).promise();
      res.status(200).json({ message: 'Submission received' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error saving submission' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}