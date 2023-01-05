import "../components/AdminUserList.css";
export default function AdminUserList({ data,handlechange}) {
  
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Username</th>
            <th>UserAddress</th>
            <th>LottreyName</th>
            <th>LotteryPurchasedate</th>
            <th>LotteryDrawdate</th>
          </tr>
          {data?.map((item, index) => {
            return (
              <>
                <tr key={item.no}>
                  <td>
                    <input
                      type={"checkbox"}
                      value={index}
                      onChange={(e) => {
                        handlechange(e.target.value);
                      }}
                      checked={item.ischecked}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.txtaddress}</td>
                  <td>{item.txtLotteryname}</td>
                  <td>{item.purchasedate}</td>
                  <td>{item.lotterydrawdate}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
