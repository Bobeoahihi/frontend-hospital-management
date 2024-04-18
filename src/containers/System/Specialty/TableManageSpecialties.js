import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialties.scss'
import * as actions from "../../../store/actions";
import { compose } from 'redux';
import './TableManageSpecialties.scss'

class TableManageSpecialties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyList: [],

        }
    }
    componentDidMount() {
        this.props.fetchAllSpecialty();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialties !== this.props.listSpecialties) {
            this.setState({
                specialtyList: this.props.listSpecialties
            })
        }
    }
    handleDeleteSpecialty = (specialty) => {
        this.props.deleteASpecialty(specialty.id)
    }
    handleEditSpecialty = (specialties) => {
        this.props.handleEditSpecialtyFromParentKey(specialties)
    }

    render() {
        let { specialtyList } = this.state
        let { listSpecialties } = this.props
        console.log('listSpecialties', listSpecialties)
        return (
            <React.Fragment>
                <table id='TableManageSpecialties'>
                    <tbody>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên chuyên khoa</th>
                            <th>Nội dung</th>
                            <th>Actions</th>
                        </tr>
                        {specialtyList && specialtyList.length > 0 &&
                            specialtyList.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.descriptionMarkdown}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditSpecialty(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteSpecialty(item)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </tbody>
                </table>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listSpecialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteASpecialty: (id) => dispatch(actions.deleteASpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialties);
