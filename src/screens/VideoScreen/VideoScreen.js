import React, { Component, useEffect } from 'react';
import { View, Image, TouchableOpacity, RefreshControl, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import VideoList from '../../components/VideoList';
import NavigationBar from '../../components/NavigationBar';
import Colors from '../../constants/Colors';
import Share from "react-native-share";
import * as VideoScreenActions from '../../redux/action/videoScreenActions'
import { useDispatch, useSelector } from 'react-redux';
import { appImages } from '../../assets/images';
import { logout } from '../../redux/action/authenticationActions';
/**
 * Class VideoScreen Extends React.Component
 */
const VideoScreen = () => {
    const dispatch = useDispatch()

    const { videos: videoList, isLoadingVideo, loadMoreVideo } = useSelector(state => state.video)

    const loadMoreVideos = () => {
        dispatch(VideoScreenActions.loadMoreVideos());
    }

    const getVideos = () => {
        dispatch(VideoScreenActions.getVideos());
    }

    useEffect(() => {
        getVideos()
    }, [])

    const renderShareButton = (url) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    let shareOptions = {
                        title: "Share my video",
                        subject: "Video"
                    };
                    shareOptions.url = url;
                    Share.open(shareOptions);
                }}
                style={styles.shareButton}>
                <Image
                    style={{ height: 20, width: 20, alignSelf: 'center' }}
                    source={appImages.shareIcon}
                />
            </TouchableOpacity>

        )
    }

    const renderVideoList = ({ item }) => {
        return (
            <VideoList
                videos={item}
                renderShareButton={renderShareButton}
            />
        )
    }

    const renderFooter = () => {
        return (
            loadMoreVideo &&
            <View style={{ marginVertical: 10 }}>
                <ActivityIndicator size="small" />
            </View>
        )
    }


    const renderFloatingButton = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    dispatch(logout())
                }}
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    height: 60,
                    backgroundColor: Colors.blue,
                    borderRadius: 100,
                }}
            >
                <Image
                    style={{ height: 30, width: 30 }}
                    source={appImages.logoutIcon}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.frameBackground }}>
            <NavigationBar />
            {isLoadingVideo ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" />
                </View>
                :
                <FlatList
                    data={videoList}
                    extraData={videoList}
                    renderItem={renderVideoList}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMoreVideos}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl
                            colors={["red"]}
                            onRefresh={getVideos}
                        />
                    }
                />
            }
            {renderFloatingButton()}
        </View>
    )
}


var styles = StyleSheet.create({
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: Colors.blue,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        margin: 10
    }
})

export default VideoScreen;