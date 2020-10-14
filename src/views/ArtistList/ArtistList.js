import React, { useState, useEffect } from 'react'
import { Card, Table, Button, InputGroup, FormControl, Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPlus, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { find } from '../../api/artists'
import { LOAD_ADMIN_ARTISTS } from '../../constants/actionTypes'
import './ArtistList.css'

const LIMIT_PER_PAGE = 10

const mapPropsToState = state => ({
  artists: state.adminArtists.data,
  count: state.adminArtists.count,
  loading: state.loading,
})

const mapDispatchToState = dispatch => ({
  load: payload => dispatch({ type: LOAD_ADMIN_ARTISTS, payload })
})

const handleLoad = load =>  ({ artists, count }) => load({ count, data: artists })

const ArtistList = ({ artists = [], count, loading, load }) => {

  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ active: 1, pages: 1 })

  useEffect(() => { find({ limit: LIMIT_PER_PAGE }).then(handleLoad(load)) }, [load])

  useEffect(() => {
    setPagination({
      active: 1,
      pages: count ? parseInt(count / LIMIT_PER_PAGE) : 0
    })
  }, [count])

  const handleChange = e => setSearch(e.target.value)

  const handleSearch = () => find({ 
    name: search.trim() ?? undefined, 
    limit: LIMIT_PER_PAGE 
  })
    .then(handleLoad(load))

  const handlePagination = page => {
    
    if (page === pagination.active) { return }

    setPagination({ ...pagination, active: page })

    find({ 
      name: search.trim() ?? undefined, 
      skip: (page - 1) * LIMIT_PER_PAGE,
      limit: LIMIT_PER_PAGE,
    })
      .then(handleLoad(load))
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            <div className="mr-auto">Artists</div>
            <PrimaryButton className="align-self-end">
              <FontAwesomeIcon size="sm" icon={faPlus} />{' '}
              New
            </PrimaryButton>
          </Card.Title>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Filter by name"
              className="ArtistList__search"
              value={search}
              onChange={handleChange}
              disabled={loading}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <InputGroup.Append>
              <Button 
                variant="secondary" 
                onClick={handleSearch}
                disabled={loading}
              >Search</Button>
            </InputGroup.Append>
          </InputGroup>
          <Table size="sm">
            <thead>
              <tr>
                <th className="ArtistList__num-col">#</th>
                <th className="ArtistList__name-col">Name</th>
                <th className="ArtistList__action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading || artists.length === 0
                ? <tr>
                    <td colSpan="3" className="text-center">
                      {loading ? 'Loading...' : 'No artists'}
                    </td>
                  </tr>
                : artists.map((artist, i) => 
                    <tr key={artist.uuid}>
                      <td>{i + 1}</td>
                      <td>{artist.name}</td>
                      <td>
                        <Button 
                          variant="success" 
                          className="mr-1" 
                          size="sm"
                        >
                          <FontAwesomeIcon size="sm" icon={faPencilAlt} />
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                        >
                          <FontAwesomeIcon size="sm" icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
            {[...Array(pagination.pages)].map((_, i) =>
              <Pagination.Item 
                key={i} 
                active={pagination.active === (i + 1)}
                onClick={() => handlePagination(i + 1)}
                disabled={loading && pagination.active !== (i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )}
          </Pagination>
        </Card.Body>
      </Card>
    </>
  )
}

export default connect(mapPropsToState, mapDispatchToState)(ArtistList)