import React from "react";
import { compose, withProps } from "recompose";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withScriptjs, withGoogleMap, withStateHandlers, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 26.8467, lng: 80.9462 }}
    >

        {props.isMarkerShown &&
            <>
                {props.locations.map(x => {
                    return (
                        <Marker key={x.id} position={{ lat: x.lat, lng: x.long }}
                            animation={google.maps.Animation.DROP}
                        // key={x.id} /> 
                        >
                        </Marker>
                    )
                })}
            </>
        }
    </GoogleMap>
)

class Maps extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 500)
    }



    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                locations={this.props.locations}
            />
        )
    }
}

const mapStateToProps = state => ({
    locations: state.toJS().user.geoPosition,
})

export default withRouter(connect(
    mapStateToProps)
    (Maps)
);