import React, { FC, useState, useEffect } from 'react';
//import azure from 'azure-storage';

import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import axios from '../../axios';
import { getEnvironmentData } from 'worker_threads';

interface AboutProps {}

interface Item {
  clientId: string;
  code: string;
  description: string;
  id: string;
  image: string;
  label: string;
  name: string;
  note: string;
  price: number;
  quantity: number;
  type: string;
}

interface Client {
  additionalInfo: string;
  address: string;
  code: string;
  email: string;
  id: string;
  items: Item[];
  name: string;
  phoneNumber: string;
  type: string;
}

type Props = {
  clients: Client[],
  onClick?: any,
  setClients?: any,
  updateParent?: any
}

const ChildComponent = ({ onClick, clients }: Props) => {
  /* clients.push(
    {
      additionalInfo: "string",
      address: "string",
      code: "string",
      email: "string",
      id: "string",
      items: [],
      name: "string",
      phoneNumber: "string",
      type: "string"
    }
  ) */

  return (
    <>
    <button onClick={onClick}>
       Click me {/* {clients.map((c: Client) => c.name)} */}
    </button>
    <p>{clients.map((c: Client) => c.name)}</p>
    </>
  )
};

const ChildComponent2 = ({ setClients, clients, updateParent }: Props) => {
  /* clients.push(
    {
      additionalInfo: "string",
      address: "string",
      code: "string",
      email: "string",
      id: "string",
      items: [],
      name: "string",
      phoneNumber: "string",
      type: "string"
    }
  ) */

  console.log(setClients);
  console.log(clients);
  console.log(updateParent);

  function setValues() {
    let clientsCopy = clients;
    clientsCopy.push(
      {
        additionalInfo: "string",
        address: "string",
        code: "string",
        email: "string",
        id: "string",
        items: [],
        name: "string",
        phoneNumber: "string",
        type: "string"
      }
    ); 
    setClients(clientsCopy);
    updateParent;
  }

  return (
    <>
      <button onClick={() => {
        setValues()
         } }>
        Click me {/* {clients.map((c: Client) => c.name)} */}
      </button>
      <p>{clients.map((c: Client) => c.name)}</p>
      <button onClick={ updateParent }>
        Click me {/* {clients.map((c: Client) => c.name)} */}
      </button>
    </>
  )
};

const About: FC<AboutProps> = () => {

  const [clients, setClients] = useState<Client[]>([]);
  const [clientName, setClientName] = useState<string>("brazil");

  /* const account = 
  'catalogv2'
  || "";
  const accountKey =
  'PZGYU3rooLKPmP52otFYEmBa26B2L+LDMmZRKpcTvc+cXzPw0hOz4KbREl7Vv3t2J82gizGtoeZyXSiqVL9uAg=='
  || ""; */

  /* const connStr = "DefaultEndpointsProtocol=https;AccountName=catalogv2;AccountKey=PZGYU3rooLKPmP52otFYEmBa26B2L+LDMmZRKpcTvc+cXzPw0hOz4KbREl7Vv3t2J82gizGtoeZyXSiqVL9uAg==;EndpointSuffix=core.windows.net";

  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

  console.log(blobServiceClient); */

  /* const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  console.log(sharedKeyCredential) */

  /* const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  ); */

  const account = "catalogv2";
  const sas = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-06-22T06:23:11Z&st=2022-04-21T22:23:11Z&spr=https&sig=QCTSjQ1U9WZRANRllagBELSK0NaNkJi%2FSkuQsds%2B%2BKQ%3D";
  const containerName = "storage-images";
  let blobName = "congresso-nacional-do-brasil (1).png";

  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);

  console.log(blobServiceClient);

  async function main(value: any) {
    console.log("VAI TOMAR NO CU");
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let i = 1;
    let blobs = containerClient.listBlobsFlat()
    
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }

    const blobClient = containerClient.getBlobClient(blobName);

    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
    console.log((await downloadBlockBlobResponse.blobBody)?.type);
    console.log("Downloaded blob content", downloaded);

    /* const content: any = "Hello world!";
    blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadStream(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId); */

    const content: any = value; //await downloadBlockBlobResponse.blobBody; //"Hello world!";
    console.log(content);
    blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadData(content); //(content, { blobHTTPHeaders: { blobContentType: (await downloadBlockBlobResponse.blobBody)?.type } });
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    async function blobToString(blob: any) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev: any) => {
          resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
  }

  async function updateStorage() {
    const request = {
      name: clientName
    };
    await axios.patch("/storage/624fb30f570d98201f131685", request);
    alert(clientName);
  }

  //main();

  const getDataName = () => {
    console.log(clients);
    clients.filter(m => m.id == "034").map(m => { setClientName(m.name) } )
  }

  const getData = async () => {
    await axios.get('items').then(async result => {
      await axios.get('storage').then(result1 => {
        console.log(result.data);
        result1.data.map((r: Client) => r.items = []);
        result.data.map((r: Item) => result1.data.filter((f: Client) => f.id == r.clientId).map((m: Client) => m.items.push(r)));
        console.log(result1.data);
        setClients(result1.data);
      })
    })/* .then( () => { clients.filter(m => m.id == "034").map(m => { setClientName(m.name); console.log(m.name) } ) } ) */;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    /* getData(); */
    getDataName();
  }, [clients]);

  let names: string[] = [];

  const [count, setCount] = useState(0);

  const increment = () => {
    alert("CLIENTS")
    console.log(clients)
    setClients(clients)
  }

  let [value, set] = useState(true);
  const updateParent = () => {
    alert("CHANGE");
    set(!value);
  };

  return (
    <div>
      <>
        {/* { () => main() } */}
        About Component
        <img src="https://catalogv2.blob.core.windows.net/storage-images/congresso-nacional-do-brasil (1).png"></img>
        <input type="file" name="image" id="i" onClick={ () => console.log(document.querySelector('input')?.addEventListener('input', function() { main(this); })) }></input>
        {/* { console.log(document.querySelector('input')?.value) } */}
        <br/>
        {/* { clients.map(c => {
          names.push(c.name);
        }, () => setClientName(names)) } */}
        {/* { clients.filter(m => m.id == "034").map(m => { setClientName(m.name) } ) } */}
        {/* { () => getDataName() } */}
        <>
          <input type="text" value={ clientName } onChange={ (e) => { setClientName(e.target.value) } }>
          </input>
          <button onClick={ () => { updateStorage(); getData() } }>
            Update
          </button>
          <br/>
          <ChildComponent onClick={increment} clients={clients} />
          <ChildComponent2 updateParent={updateParent} /* increment={increment} */ setClients={setClients} clients={clients} />
          <h2>count {clients.map((c: Client) => c.name)}</h2>
        </>
        {/* { clientName.map(c => {
          return <><input type="text" value={ c }></input><button>Update</button><br/></>
        }) } */}
        { clients.map(c => {
          return <p>{ c.name }</p>
        }) }
      </>
    </div>
  ) 
};

export default About;