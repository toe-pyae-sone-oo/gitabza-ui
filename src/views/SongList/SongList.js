import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, InputGroup, FormControl, Button, Table, Pagination, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPlus, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { LOAD_ADMIN_SONGS } from '../../constants/actionTypes'
import { find, remove } from '../../api/songs'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import './SongList.css'

const LIMIT_PER_PAGE = 2

const mapStateToProps = state => ({
  songs: state.adminSongs.data,
  count: state.adminSongs.count,
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  load: payload => dispatch({ type: LOAD_ADMIN_SONGS, payload })
})

const handleLoad = load => ({ songs, count }) => load({ count, data: songs })

const SongList = ({ 
  songs = [], 
  count = 0, 
  loading = false, 
  load,
  history,
}) => {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ active: 1, pages: 1 })
  const [dialog, setDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(undefined)

  const handleChange = e => setSearch(e.target.value)

  useEffect(() => {
    find({ limit: LIMIT_PER_PAGE }).then(handleLoad(load))
  }, [load])

  useEffect(() => {
    const pages = count ? Math.ceil(count / LIMIT_PER_PAGE) : 1
    setPagination({
      active: pagination.active > pages 
        ? pages
        : pagination.active,
      pages,
    })
  }, [count, pagination.active])

  const handleSearch = () => find({
    title: search.trim() ?? undefined,
    limit: LIMIT_PER_PAGE
  })
    .then(handleLoad(load))

  const handlePagination = page => {
    if (page === pagination.active) { return }
  
    setPagination({ ...pagination, active: page })
  
    find({ 
      title: search.trim() ?? undefined, 
      skip: (page - 1) * LIMIT_PER_PAGE,
      limit: LIMIT_PER_PAGE,
    })
      .then(handleLoad(load))
  }

  const handleDelete = id => {
    setDialog(true)
    setDeleteId(id)
  }

  const cancelDelete = () => {
    setDialog(false)
    setDeleteId(undefined)
  }

  const deleteSong = () => {
    remove(deleteId)
      .then(() => find({
        title: search.trim() ?? undefined,
        skip: (pagination.page - 1) * LIMIT_PER_PAGE,
        limit: LIMIT_PER_PAGE,
      }))
      .then(handleLoad(load))
    setDialog(false)
  }

  return (
    <>
      <Modal 
        animation={false}
        show={dialog} 
        onHide={cancelDelete}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteSong}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            <div className="mr-auto">Songs</div>
            <PrimaryButton 
              className="align-self-end" 
              onClick={() => history.push('/admin/songs/new')}
            >
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
              placeholder="Filter by title"
              className="SongList__search"
              value={search}
              onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              disabled={loading}
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
                <th className="SongList__num-col">#</th>
                <th className="SongList__title-col">Title</th>
                <th className="SongList__action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading || songs.length === 0
                ? <tr>
                    <td colSpan="3" className="text-center">
                      {loading ? 'Loading...' : 'No songs'}
                    </td>
                  </tr>
                : songs.map((song, i) => 
                    <tr key={song.uuid}>
                      <td>{((pagination.active - 1) * LIMIT_PER_PAGE) + i + 1}</td>
                      <td>{song.title}</td>
                      <td>
                        <Button 
                          variant="success" 
                          className="mr-1" 
                          size="sm"
                          onClick={() => history.push(`/admin/songs/${song.uuid}/edit`)}
                        >
                          <FontAwesomeIcon size="sm" icon={faPencilAlt} />
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDelete(song.uuid)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SongList)