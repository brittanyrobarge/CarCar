import React, { useState, useEffect } from 'react';

function ManufacturersList() {
    const [list, setList] = useState([]);

    async function loadManufacturers() {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
          const data = await response.json();
          setList(data.manufacturers)
        } else {
          console.error(response);
        }
      }

        useEffect(() => {
        loadManufacturers();
      }, []);

        return (
        <>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {list?.map(manufacturers => {
                  return (
                    <tr key={manufacturers.id}>
                      <td>{ manufacturers.name }</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </>
          );
        }

export default ManufacturersList;
