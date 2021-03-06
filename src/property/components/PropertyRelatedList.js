/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import PropertyIcons from '../components/PropertyIcons';
import PropertyTags from '../components/PropertyTags';
import Swiper from 'react-native-swiper';
import Favorite from '../components/Favorite';
import colors from '../../common/colors';
import moment from 'moment';
import Separator from './../../components/Separator';
import {CountryPropType} from './../common/proptypes';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class PropertyRelatedList extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    loadScene: PropTypes.func.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    country: CountryPropType.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  _shouldItemUpdate = (prev, next) => {
    return prev.item !== next.item;
  };

  renderHeader = () => {
    let {title} = this.props;
    return (
      <View style={{paddingTop: 10}}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  };

  imageSlider = item => {
    let {loadScene} = this.props;
    return item.images.map((image, i) => (
      <TouchableHighlight
        key={i}
        onPress={() => loadScene(item)}
        underlayColor="transparent"
        style={{flex: 1}}>
        <Image style={styles.image} source={{uri: image}} resizeMode="cover" />
      </TouchableHighlight>
    ));
  };

  renderRow = ({item, index}) => {
    const {loadScene, handleFavoritePress, country} = this.props;

    return (
      <View style={[styles.row]} key={index}>

        <TouchableHighlight
          onPress={() => loadScene(item)}
          underlayColor="transparent">
          <Text style={styles.title}>{item.meta.title}</Text>
        </TouchableHighlight>

        <Swiper
          loadMinimal
          loadMinimalSize={1}
          style={styles.wrapper}
          loop={false}
          height={200}>
          {this.imageSlider(item)}
        </Swiper>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          }}>

          <View style={{flex: 2}}>

            <PropertyTags items={item.tags || ['Laundry', 'Swimming Pool']} />

            <PropertyIcons
              services={item.meta || []}
              items={['bedroom', 'bathroom', 'parking']}
            />

            <Text style={styles.lightText}>
              Added {moment(item.created_at).fromNow()}
            </Text>

          </View>

          <View style={{flex: 1}}>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>

              <Text style={styles.price}>
                {item.price}
              </Text>

              <Favorite
                handleFavoritePress={() => handleFavoritePress(item)}
                isFavorited={item.isFavorited}
              />

            </View>

            <Text style={[styles.lightText, {textAlign: 'center'}]}>
              {item.views} views
            </Text>

          </View>

        </View>

      </View>
    );
  };

  render() {
    const {collection, isFetching} = this.props;

    return (
      <FlatList
        style={styles.container}
        data={collection}
        renderItem={this.renderRow}
        enableEmptySections={true}
        ref="listView"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        initialListSize={10}
        ListHeaderComponent={() => !isFetching && this.renderHeader()}
        ItemSeparatorComponent={() => <Separator />}
        shouldItemUpdate={this._shouldItemUpdate}
        getItemLayout={(data, index) => ({
          length: 300,
          offset: 300 * index,
          index,
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  wrapper: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  row: {
    flex: 1,
  },
  title: {
    flex: 1,
    color: '#2c2d30',
    margin: 10,
    fontWeight: '600',
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 200,
    backgroundColor: 'rgba(0,0,0,.96)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  price: {
    fontWeight: '600',
    fontSize: 16,
  },
  loadingImage: {
    width: 60,
    height: 60,
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 12,
  },
  searchHint: {
    textAlign: 'center',
    fontWeight: '100',
    color: colors.fadedBlack,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.accent,
    textAlign: 'center',
  },
});
