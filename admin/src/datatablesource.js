export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"/upload/" + params.row.profilePicture}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: " Address",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const eventsColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"/upload/" + params.row.destinationImage}
            alt="avatar"
          />
          {params.row.destination}
        </div>
      );
    },
  },
  {
    field: "eventType",
    headerName: "Event Type",
    width: 150,
  },
  {
    field: "host",
    headerName: "Event Host",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={"/upload/" + params.row.User.profilePicture}
            alt=""
            className="cellImg"
          />
          {params.row.User.username}
        </div>
      );
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 100,
  },
  {
    field: "endDate",
    headerName: " End Date",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
  },
];

export const hotelColumns = [
  {
    field: "id",
    headerName: "ID",
    with: 50,
  },
  {
    field: "name",
    headerName: "Hotel Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.row.image} alt="" className="cellImg" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "score",
    headerName: "Score of 10",
    width: 100,
  },
  { field: "average", headerName: "Average", width: 130 },
  {
    field: "discounted_price",
    headerName: "Price",
    width: 120,
  },
  {
    field: "url",
    headerName: "URL",
    width: 300,
  },
];

export const paymentColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "username",
    headerName: "User Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"/upload/" + params.row.User.profilePicture}
            alt="avatar"
          />
          {params.row.User.username}
        </div>
      );
    },
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"/upload/" + params.row.Event.destinationImage}
            alt="avatar"
          />
          {params.row.Event.destination}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 300,
  },
  { field: "createdAt", headerName: "Date", width: 300 },
];

export const verificationColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "username",
    headerName: " User Name",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={"/upload/" + params.row.User.profilePicture}
            alt=""
            className="cellImg"
          />
          {params.row.User.username}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Submitted On",
    width: 250,
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
