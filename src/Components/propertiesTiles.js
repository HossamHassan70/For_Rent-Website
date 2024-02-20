
const getRandomProperty = () => {
    const properties = [
        'Luxury Apartment in Downtown',
        'Cozy Beach House',
        'Spacious Family Home with Garden',
        'Modern City Loft',
        'Rural Farmhouse Retreat',
        'Sunny Side Villa',
        'Lakeview Retreat',
        'Mountain Chalet',
        'Urban Oasis Apartment',
        'Seaside Condo',
        'Country Estate',
        'City Skyline Loft',
        'Riverside Cottage',
        'Desert Hideaway',
        'Forest Cabin'
    ];
    return properties[Math.floor(Math.random() * properties.length)];
};

const getRandomType = () => {
    const types = ['Villa', 'House', 'Chalet', 'Apartment', 'Condo', 'Cottage', 'Loft', 'Cabin', 'Townhouse', 'Mansion'];
    return types[Math.floor(Math.random() * types.length)];
};

const getRandomOwner = () => {
    const owners = [
        'John Smith',
        'Emily Johnson',
        'Michael Williams',
        'Sophia Brown',
        'David Wilson',
        'Alice Adams',
        'Bob Brown',
        'Charlie Clark',
        'Diana Davis',
        'Edward Evans',
        'Fiona Fisher',
        'George Green',
        'Hannah Harris',
        'Ian Ingram',
        'Julia Jackson'
    ];
    return owners[Math.floor(Math.random() * owners.length)];
};

const getRandomAddress = () => {
    const addresses = [
        '123 Main St, Cityville, State',
        '456 Ocean Ave, Beachtown, State',
        '789 Elm St, Suburbia, State',
        '101 Pine St, Countryside, State',
        '222 High St, Hillside, State',
        '123 Maple Street, Springfield, USA',
        '456 Oak Avenue, Rivertown, USA',
        '789 Pine Road, Mountainview, USA',
        '101 Elm Lane, Lakeside, USA',
        '222 Cedar Drive, Parkville, USA',
        '333 Birch Court, Meadowville, USA',
        '444 Willow Way, Hillside, USA',
        '555 Spruce Street, Beachside, USA',
        '666 Walnut Avenue, Citycenter, USA',
        '777 Aspen Boulevard, Countryside, USA'
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
};

const PropertiesTiles = () => {
    return (
        <tbody>
            <td>{getRandomProperty()}</td>
            <td>{getRandomType()}</td>
            <td>{getRandomOwner()}</td>
            <td>{getRandomAddress()}</td>
            <td>
                <i className="mx-2 fas fa-pen"></i>
                <i className="mx-2 fas fa-trash"></i>
            </td>
        </tbody>
    );
};
export default PropertiesTiles;