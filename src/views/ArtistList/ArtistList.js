import React from 'react'
import { Card, Table, Button } from 'react-bootstrap'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import './ArtistList.css'

const ArtistList = () =>
  <>
    <Card>
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          <div className="mr-auto">Artists</div>
          <PrimaryButton className="align-self-end" size="sm">New</PrimaryButton>
        </Card.Title>
        <Table size="sm">
          <thead>
            <tr>
              <th className="ArtistList__num-col">#</th>
              <th className="ArtistList__name-col">Name</th>
              <th className="ArtistList__action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Toe</td>
              <td>
                <Button variant="success" className="mr-1" size="sm">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  </>

export default ArtistList