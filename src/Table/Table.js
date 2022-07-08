import React from "react";


export default props => {
  const styleStatus = {
    "new": {
      text: "Новое",
      color: "blueviolet"
    },
    "assigned_to": {
      text: "Назначено",
      color: 'orange'
    },
    "started": {
      text: "Запущено",
      color: "green"
    },
    "completed": {
      text: "Завершено",
      color: "darkslategrey"
    },
    "declined": {
      text: "Отменено",
      color: "red"
    }
  };

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={props.onSort.bind(null, 'id')}>
            Номер / Дата
          </th>
          <th onClick={props.onSort.bind(null, 'firstName')}>
            Тип задания / Автор
          </th>
          <th onClick={props.onSort.bind(null, 'lastName')}>
            Аккаунт / Терминал
          </th>
          <th onClick={props.onSort.bind(null, 'email')}>
            Статус
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item.id + item.oguid} onClick={() => {
            props.onRowSelect.bind(null, item);
            openInNewTab(`https://${window.location.href}${item.id}`);
          }}>
            <td>
              <h6 class="text-tru;ncate">№{item.id}</h6>
              <span class="text-secondary text-truncate">{new Date(item.created_date).toLocaleString().split(',').join('').slice(0, -3)}</span>
            </td>
            <td>
              <h6 class="text-truncate">{item.order_type.name}</h6>
              <span class="text-secondary text-truncate">{item.created_user.surname} {item.created_user.name.slice(0, 1)}.{item.created_user.patronymic.slice(0, 1)}.</span>
            </td>
            <td>
              <h6 class="text-truncate">{item.account.name}</h6>
              <span class="text-secondary text-truncate">{item.terminal.name}</span>
            </td>
            <td class={`status ${item.status}`}>
              <span style={{
                display: "inline-block",
                backgroundColor: `${styleStatus[item.status].color}`,
                color: "white",
                borderRadius: "5px",
                padding: "5px 11px",
                textAlign: "center",
                width: "110px"
              }}>{styleStatus[item.status].text}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
